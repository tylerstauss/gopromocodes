# app/controllers/sitemaps_controller.rb

class SitemapsController < ApplicationController

  layout :false
  before_action :init_sitemap

  def index
    @stores = Store.all
    @categories = Category.all
  end

  private

  def init_sitemap
    headers['Content-Type'] = 'application/xml'
  end

end