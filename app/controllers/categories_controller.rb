class CategoriesController < ApplicationController

	def index
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)

	end

	def new
		authenticate_admin!
		@category = Category.new
	end

	def create
		@category = Category.new(category_params)
	  @category.save
	  @categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	  redirect_to @category
	end

	def show
		@category = Category.find(params[:id])
		@categories = Category.order('name ASC')
		@promo_codes = @category.promo_codes
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def edit
		authenticate_admin!
		@category = Category.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		category = Category.find(params[:id])
    category.update!(category_params)
    redirect_to category
	end

	def delete
	end

	private
  def category_params
    params.require(:category).permit(:name,:description, :meta_keywords, :meta_description, :meta_title, :slug)
  end
	
	
end