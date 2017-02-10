Sitemap::Generator.instance.load :host => "gopromocodes.com" do
  path :root, :priority => 1
  path :about, :priority => 0.1, :change_frequency => "monthly"
  resources :stores
  resources :categories
end