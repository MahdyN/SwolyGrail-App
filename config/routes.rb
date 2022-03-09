Rails.application.routes.draw do
  
  # namespace :api do

  resources :workouts, only: [:index, :create, :update, :destroy]
  resources :exercises, only: [:index]
  
  # User routes
  post '/signup', to: "users#create"
  get '/me', to: "users#show"

  # Session routes

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  # end



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
