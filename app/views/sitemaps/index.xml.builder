xml.instruct! :xml, version: '1.0'
xml.tag! 'urlset', 'xmlns' => "http://www.sitemaps.org/schemas/sitemap/0.9" do

  xml.tag! 'url' do
    xml.tag! 'loc', root_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', contact_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', about_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', terms_url
  end  

  xml.tag! 'url' do
    xml.tag! 'loc', grocery_coupons_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', stores_url
  end

   xml.tag! 'url' do
    xml.tag! 'loc', new_codes_url
  end 

  @stores.each do |store|
    xml.tag! 'url' do
      xml.tag! 'loc', store_url(store)
      xml.lastmod store.updated_at.strftime("%F")
    end
  end

    @categories.each do |category|
    xml.tag! 'url' do
      xml.tag! 'loc', category_url(category)
      xml.lastmod category.updated_at.strftime("%F")
    end
  end

  xml.tag! 'url' do
    xml.tag! 'loc', articles_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', gardening_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', fairtrade_url
  end
  xml.tag! 'url' do
    xml.tag! 'loc', games_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', clipart_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', entertainment_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', cellphones_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', moneysaving_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', photography_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', keyboarding_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', classics_url
  end

  xml.tag! 'url' do
    xml.tag! 'loc', newyears_url
  end

end