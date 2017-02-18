Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :categories
  resources :stores
  resources :promo_codes
  resources :users

  # Coupons
  get 'new-codes', to: 'promo_codes#newest' 

  # Static
  get 'about', to: 'static#about'
  get 'contact', to: 'static#contact'	
  get 'search', to: 'static#search'		
  get 'grocery-coupons', to: 'static#grocery'
  get 'terms-and-privacy-policy', to: 'static#terms', as: :terms
  get 'articles', to: 'static#articles'
  get 'gardening-tips-and-resources', to: 'static#gardening', as: :gardening
  get 'buying-fair-trade', to: 'static#fairtrade', as: :fairtrade
  get 'online-learning-games', to: 'static#games', as: :games
  get 'clip-art-resources', to: 'static#clipart', as: :clipart
  get 'advancements-in-home-entertainment-healthier-lives', to: 'static#entertainment', as: :entertainment
  get 'how-cell-phones-are-changing-our-lives', to: 'static#cellphones', as: :cellphones
  get 'three-online-money-saving-strategies', to: 'static#moneysaving', as: :moneysaving
  get 'photography-resources', to: 'static#photography', as: :photography
  get 'keyboarding-resources-for-your-computer', to: 'static#keyboarding', as: :keyboarding
  get 'classic-books-on-sat-reading-list', to: 'static#classics', as: :classics
  get 'new-years-traditions', to: 'static#newyears', as: :newyears
  get 'author-biography-zoe-stauss', to: 'static#zoe_stauss', as: :zoestauss
    get 'author-biography-tyler-stauss', to: 'static#tyler_stauss', as: :tylerstauss
  # Sessions
  match 'sign-out', to: 'sessions#destroy', via: [ :get, :post], as: :signout
  get '/sign-in', :to => 'sessions#new', as: :signin
  get '/sign-up', :to => 'users#new', as: :signup
  post '/sessions', :to => 'sessions#create'

  # Redirects
  get '/p/printable-grocery-coupons.html', to: redirect("/grocery-coupons", status: 301)
  get '/stores.html', to: redirect("/stores", status: 301)
  get 'coupons-categories.html', to: redirect("/categories", status: 301)
  get 'deals.html', to: redirect("/new-codes", status: 301)
  get '/p/about-us.html', to: redirect("/about", status: 301)
  get 'contact_us', to: redirect("/contact", status: 301)
  get '/p/printable-grocery-coupons.html', to: redirect("/grocery-coupons", status: 301)
  get '/p/Privacy.html', to: redirect("/terms-and-privacy-policy", status: 301)
  get '/p/three-online-money-saving-strategies.html', to: redirect("/three-online-money-saving-strategies", status: 301) 
  get '/p/author-biography-zoe-stauss.html', to: redirect("/author-biography-zoe-stauss", status: 301) 


  @stores = Store.all

  @stores.each do |store|
    get "/store/#{store.old_slug}.html", to: redirect("/stores/#{store.slug}", status: 301)
    # get "/store/#{store.slug}.html", to: redirect("/stores/#{store.slug}", status: 301)
  end

  root :to => 'static#index'
end
