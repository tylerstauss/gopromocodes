Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :categories
  resources :stores
  resources :promo_codes


  # Static
  get 'about', to: 'static#about'
  get 'contact', to: 'static#contact'	
  get 'search', to: 'static#search'		

  root :to => 'static#index'
end
