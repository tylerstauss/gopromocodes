Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :categories
  resources :stores
  resources :promo_codes
  resources :users


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

  root :to => 'static#index'
end
