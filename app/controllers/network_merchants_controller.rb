class NetworkMerchantsController < ApplicationController
	

	private


  def network_merchant_params
    params.require(:network_merchant).permit(:network,:website_id, :name, :network_id, :status, :joined, :url, :domain)
  end
end