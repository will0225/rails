# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :repo_url,        'git@bitbucket.org:webweirdos/noteworthy.git'
set :application,     'noteworthy'
set :user,            'ubuntu'
set :puma_threads,    [4, 16]
set :puma_workers,    0
set :sidekiq_monit_default_hooks, false

set :full_app_name,   "#{fetch(:application)}_#{fetch(:stage)}"
set :use_sudo,        false
set :deploy_via,      :remote_cache

set :ssh_options, {
  forward_agent: true,
  user:          fetch(:user),
  keys:          %w(~/Keys/noteworthy.pem)
}

server '13.59.68.90', user: 'ubuntu', roles: %w{web app db}
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:full_app_name)}"
set :puma_bind,       "unix:///#{shared_path}/sockets/puma.sock"
set :puma_state,      "#{shared_path}/pids/puma.state"
set :puma_pid,        "#{shared_path}/pids/puma.pid"

set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true

## Linked Files & Directories (Default None):
set :linked_files, %w[config/database.yml config/master.key]
set :linked_dirs,  %w[log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system]
set :keep_releases, 5

namespace :deploy do
  task :restart do
    invoke 'puma:restart'
  end
end
