Rails.application.routes.draw do
  
  match '*any' => 'application#options', :via => [:options]
  match '*path', :controller => 'application', :action => 'empty', :constraints => {:method => "OPTIONS"}
  get 'messages/new'

  get 'messages/create'

  devise_for :users
  # get 'cart/index'

  root 'page#home'

  # get '/products'=>'products#index'
  resources :products
  resources :pages

  get '/cart/:id/add'=>'cart#add'
  delete '/cart/destroy'=>'cart#destroy'
  get '/cart'=>'cart#index'
  get '/cart/:id/remove'=>'cart#remove_item'
  # resources :cart

  get 'page/about'

  get 'page/contact'

  get 'contact', to: 'messages#new', as: 'contact'
  post 'contact', to: 'messages#create'

  

 
end
