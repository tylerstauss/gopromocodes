class CategoriesController < ApplicationController

	def index
		@categories = Category.all
	end

	def new
		@category = Category.new
	end

	def create
		@category = Category.new(category_params)
	  @category.save
	  redirect_to @category
	end

	def show
		@category = Category.find(params[:id])
	end

	def edit
		@category = Category.find(params[:id])
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