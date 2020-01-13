# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_08_131036) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "audios", force: :cascade do |t|
    t.bigint "song_id"
    t.integer "type"
    t.integer "duration"
    t.string "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "waveform"
    t.index ["song_id"], name: "index_audios_on_song_id"
  end

  create_table "participants", force: :cascade do |t|
    t.bigint "artist_id"
    t.bigint "song_id"
    t.integer "role", null: false
    t.float "contribution_percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_participants_on_artist_id"
    t.index ["song_id"], name: "index_participants_on_song_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "token"
    t.string "type"
    t.integer "duration"
    t.integer "position"
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "playlists_songs", force: :cascade do |t|
    t.bigint "song_id"
    t.bigint "playlist_id"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id"], name: "index_playlists_songs_on_playlist_id"
    t.index ["song_id"], name: "index_playlists_songs_on_song_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id"
    t.string "access_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "title", null: false
    t.integer "bpm", null: false
    t.boolean "hot", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.integer "version"
    t.bigint "song_id"
    t.bigint "version_connection_id"
    t.integer "position"
    t.index ["bpm"], name: "index_songs_on_bpm"
    t.index ["song_id"], name: "index_songs_on_song_id"
    t.index ["version_connection_id"], name: "index_songs_on_version_connection_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.bigint "tag_id"
    t.string "taggable_type"
    t.bigint "taggable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_type", "taggable_id"], name: "index_taggings_on_taggable_type_and_taggable_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "time_markers", force: :cascade do |t|
    t.string "name"
    t.bigint "song_id"
    t.decimal "time", precision: 7, scale: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["song_id"], name: "index_time_markers_on_song_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "type", default: "", null: false
    t.string "email"
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "users_playlists", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "playlist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id"], name: "index_users_playlists_on_playlist_id"
    t.index ["user_id"], name: "index_users_playlists_on_user_id"
  end

  create_table "version_connections", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "audios", "songs"
  add_foreign_key "participants", "artists"
  add_foreign_key "participants", "songs"
  add_foreign_key "playlists", "users"
  add_foreign_key "playlists_songs", "playlists"
  add_foreign_key "playlists_songs", "songs"
  add_foreign_key "sessions", "users"
  add_foreign_key "songs", "songs"
  add_foreign_key "songs", "version_connections"
  add_foreign_key "time_markers", "songs"
end
