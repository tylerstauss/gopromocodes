# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://www.gopromocodes.com"

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
    Store.find_each do |store|
      add store_path(store), :lastmod => store.updated_at, :priority => 0.9
    end
     Category.find_each do |category|
      add category_path(category), :lastmod => category.updated_at, :priority => 0.3
    end
end
