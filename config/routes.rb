Rails.application.routes.draw do
  resources :pages
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'hello_react' => 'application#hello_react'
  get 'hello_react_2' => 'application#hello_react_2'

  namespace :admin do
    resources :social_accounts, path: 'social-accounts'
  end

  # Defines the root path route ("/")
  # root "articles#index"
end
