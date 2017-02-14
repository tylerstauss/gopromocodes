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


  @stores = Store.all

  @stores.each do |store|
    get "/store/#{store.old_slug}.html", to: redirect("/stores/#{store.slug}", status: 301)
    # get "/store/#{store.slug}.html", to: redirect("/stores/#{store.slug}", status: 301)
  end

  root :to => 'static#index'
end
