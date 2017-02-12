class UsersController < ApplicationController

	def index
		@users = User.search(params[:term], params[:page])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		@user = User.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def create
		@user = User.new(user_params)
	  @user.save
	  @categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	  redirect_to @user
	end

	def show
		@user = User.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def edit
		@user = User.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		user = User.find(params[:id])
    user.update!(user_params)
    redirect_to user
	end

	def delete
	end

private
  def user_params
    params.require(:user).permit(:username, :email, :admin, :password)
  end
	
end