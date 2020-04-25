class NetworkMerchant < ActiveRecord::Base
require 'uri'

  def self.get_cj_merchants
    headers = {'Authorization' => "Bearer #{Figaro.env.GPC_CJ_KEY}"}
    url = "https://advertiser-lookup.api.cj.com/v2/advertiser-lookup?requestor-cid=2715261&advertiser-ids=joined&records-per-page=100" 
    
    merchant_count = 100
    page = 1
    while merchant_count == 100
      p url = "https://advertiser-lookup.api.cj.com/v2/advertiser-lookup?requestor-cid=2715261&advertiser-ids=joined&records-per-page=100&page-number=#{page}" 
      response = HTTParty.get(url, :headers => headers) 
      merchants = response['cj_api']['advertisers']['advertiser']
      p merchant_count = merchants.count
      p page = page + 1
      merchants.each do |merchant|

        begin
          network_id = merchant['advertiser_id']
          network  = 'cj'
          p name = merchant["advertiser_name"]
          if merchant["account_status"] = 'Active'
            active = true
          else
            active = false
          end
          status = merchant["account_status"]
          url = merchant["program_url"].downcase
          domain = URI.parse(url).host.gsub('www.', '')
          if merchant["relationship_status"] = 'joined'
            joined = true
          else
            joined = false
          end 
          network_merchant = NetworkMerchant.where(network: 'cj', network_id: network_id).first_or_create
          network_merchant.name = name
          network_merchant.active = active
          network_merchant.website_id = '3509648'
          network_merchant.joined = joined
          network_merchant.url = url
          network_merchant.domain = domain
          network_merchant.save
        rescue
          p "error with merchant #{merchant}"
        end
      end
    end
  end

  def self.get_cj_link_ids
    merchants = NetworkMerchant.where(network: 'cj', joined: true)
    p merchants.count
    p merchants.first.network_id
    headers = {'Authorization' => "Bearer #{Figaro.env.GPC_CJ_KEY}"}
    merchants.each do |merchant|
      begin
        url = "https://link-search.api.cj.com/v2/link-search?website-id=3509648&link-type=Text Link&advertiser-ids=#{merchant.network_id}"
        response = HTTParty.get(url, :headers => headers)
        if response
          links = response['cj_api']['links']['link']
          if links
            p "merchant id: #{merchant.network_id}, name: #{merchant.name}"
            link_id = links[0]['link_id']
            p "link id: #{link_id}"
            merchant.link_id = link_id
            merchant.save
            p merchant
          end
        end
      rescue
        p "error with merchant #{merchant}"
      end
    end
  end
end