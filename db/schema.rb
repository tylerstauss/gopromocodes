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

ActiveRecord::Schema.define(version: 20190210184946) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "meta_keywords"
    t.string   "meta_title"
    t.string   "meta_description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.index ["name", "slug"], name: "index_categories_on_name_and_slug", unique: true, using: :btree
  end

  create_table "category_promo_codes", force: :cascade do |t|
    t.integer  "promo_code_id"
    t.integer  "category_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["category_id"], name: "index_category_promo_codes_on_category_id", using: :btree
    t.index ["promo_code_id"], name: "index_category_promo_codes_on_promo_code_id", using: :btree
  end

  create_table "promo_codes", force: :cascade do |t|
    t.integer  "store_id"
    t.string   "title"
    t.text     "description"
    t.date     "starts"
    t.text     "code"
    t.string   "link"
    t.boolean  "homepage",      default: false
    t.boolean  "free_shipping", default: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.date     "expires"
    t.boolean  "user_submit",   default: false
    t.boolean  "approved",      default: true
    t.integer  "order_id"
    t.index ["store_id"], name: "index_promo_codes_on_store_id", using: :btree
  end

  create_table "store_blogs", force: :cascade do |t|
    t.integer  "store_id"
    t.string   "publish_date"
    t.text     "post"
    t.string   "author",       default: "Tyler"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.date     "pub_date"
    t.index ["store_id"], name: "index_store_blogs_on_store_id", using: :btree
  end

  create_table "stores", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.text     "description"
    t.boolean  "active",           default: true
    t.boolean  "user_submit",      default: true
    t.string   "meta_keywords"
    t.string   "meta_title"
    t.string   "meta_description"
    t.integer  "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.boolean  "top_store"
    t.string   "old_slug"
    t.string   "search_terms"
    t.string   "network_id"
    t.string   "network"
    t.string   "domain"
    t.index ["category_id"], name: "index_stores_on_category_id", using: :btree
    t.index ["name", "slug"], name: "index_stores_on_name_and_slug", unique: true, using: :btree
  end

  create_table "subscribers", force: :cascade do |t|
    t.string   "email"
    t.boolean  "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.boolean  "admin",           default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

end
