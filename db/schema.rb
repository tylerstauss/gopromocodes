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

ActiveRecord::Schema.define(version: 20170203042146) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text   "description"
    t.string "meta_keywords"
    t.string "meta_title"
    t.string "meta_description"
  end

  create_table "stores", force: :cascade do |t|
    t.string  "name"
    t.string  "url"
    t.text    "description"
    t.boolean "active",           default: true
    t.boolean "user_submit",      default: true
    t.string  "meta_keywords"
    t.string  "meta_title"
    t.string  "meta_description"
    t.integer "category_id"
    t.index ["category_id"], name: "index_stores_on_category_id", using: :btree
  end

end
