Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :proofs_of_concept, path: 'poc' do
    get 'hello_react_1' => 'hello_react#hello_react_1'
    get 'hello_react_2' => 'hello_react#hello_react_2'

    resources :pages
  end

  namespace :admin do
    resources :social_accounts, path: 'social-accounts', except: %i[show]
  end

  # Defines the root path route ("/")
  # root "articles#index"
end
