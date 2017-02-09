Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :categories
  resources :stores
  resources :promo_codes


  # Static
  get 'about', to: 'static#about'

  root :to => 'static#index'
end
