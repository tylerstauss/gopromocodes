import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    // Check if the user is authenticated and is an admin
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the store ID from the request body
    const { storeId } = await request.json()
    
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store ID is required' },
        { status: 400 }
      )
    }

    // Get the store from the database
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    })

    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    // Check if domain exists
    if (!store.domain) {
      return NextResponse.json(
        { error: 'Store domain is missing' },
        { status: 400 }
      )
    }

    // Fetch promotions from Honey
    const domain = store.domain
    const storeUrl = `https://d.joinhoney.com/v2/stores/partials/find?domain=${domain}`
    
    const storeResponse = await fetch(storeUrl)
    
    if (!storeResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch store data from Honey' },
        { status: 500 }
      )
    }

    const storeData = await storeResponse.json()
    const honeyStoreId = storeData[domain]
    
    if (!honeyStoreId) {
      return NextResponse.json(
        { error: 'Store not found in Honey' },
        { status: 404 }
      )
    }

    const couponsUrl = `https://d.joinhoney.com/stores/${honeyStoreId}?coupons=1&stats=1&ugc=1&gold=1&max_ugcs=3`
    const couponsResponse = await fetch(couponsUrl)
    
    if (!couponsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch coupons from Honey' },
        { status: 500 }
      )
    }

    const couponsData = await couponsResponse.json()
    const coupons = couponsData.coupons

    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        { message: 'No coupons found for this store', count: 0 },
        { status: 200 }
      )
    }

    // Process and save the coupons
    const results = []
    let createdCount = 0

    for (const coupon of coupons) {
      try {
        // Calculate dates
        let endDate = null
        if (coupon.expires && coupon.expires !== 0) {
          endDate = new Date(coupon.expires * 1000)
        }
        
        const startDate = new Date(coupon.created * 1000)
        const code = coupon.code
        const title = coupon.description
        const description = `${title} at ${domain}.`
        const linkDestination = store.url

        // Skip exclusive coupons
        if (coupon.exclusive === false) {
          // Check if the coupon already exists
          const existingCode = await prisma.promoCode.findFirst({
            where: {
              storeId: store.id,
              title: title.replace(/\n/g, " ").replace(/\r/g, " "),
              code,
              description: description.replace(/\n/g, " ").replace(/\r/g, " ")
            }
          })

          if (!existingCode) {
            // Create the promo code
            const newCode = await prisma.promoCode.create({
              data: {
                storeId: store.id,
                title: title.replace(/\n/g, " ").replace(/\r/g, " "),
                code,
                description: description.replace(/\n/g, " ").replace(/\r/g, " "),
                link: linkDestination,
                starts: startDate,
                expires: endDate,
                approved: true,
                userSubmit: false,
                homepage: false,
                freeShipping: description.toLowerCase().includes('free shipping')
              }
            })

            // Update the order ID
            await prisma.promoCode.update({
              where: { id: newCode.id },
              data: { orderId: newCode.id }
            })

            results.push(newCode)
            createdCount++
          }
        }
      } catch (error) {
        console.error('Error processing coupon:', error)
      }
    }

    return NextResponse.json(
      { 
        message: `Successfully created ${createdCount} new promo codes`, 
        count: createdCount,
        couponsFound: coupons.length
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching Honey promotions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch and save promotions' },
      { status: 500 }
    )
  }
} 