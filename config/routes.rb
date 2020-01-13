Rails.application.routes.draw do
  get '/', to: redirect('/hot')

  devise_for :admins, class_name: 'Users::Admin'

  authenticate :admin do
    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  end

  devise_for :users, class_name: 'Users::Customer', only: :sessions

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resource :user, only: [:show, :update]
      patch '/change_password', to: 'passwords#update'
      resources :sessions, only: [:create]
      delete '/sessions', to: 'sessions#destroy'
      resources :songs, only: [:index, :show]
      resources :playlists_songs, only: [:create]
      delete '/playlists_songs', to: 'playlists_songs#destroy'
      resources :playlists, only: [:index, :create, :update, :destroy] do
        post :copy, on: :member
      end
      resources :artists, only: [:show]
      resources :search_filters, only: [:index]
      resources :users_playlists, only: [:create, :destroy]
    end
  end

  get '/audio_files/:audio_id/:version', to: 'audio_files#show', as: :audio_file

  root to: 'pages#react'
  get '*path', to: 'pages#react'
end
