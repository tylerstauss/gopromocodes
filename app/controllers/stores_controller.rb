class StoresController < ApplicationController

	def index
		@stores = Store.all
	end

	def new
		@store = Store.new
	end

	def create
		@store = Store.new(store_params)
	  @store.save
	  redirect_to @store
	end

	def show
		@store = Store.find(params[:id])
	end

	def edit
		@store = Store.find(params[:id])
	end

	def update
		store = Store.find(params[:id])
    store.update!(store_params)
    redirect_to store
	end

	def delete
	end

private
  def store_params
    params.require(:store).permit(:name, :description, :url, :meta_keywords, :meta_description, :meta_title, :active, :user_submit, :category_id, :slug)
  end
	
end