class SubscribersController < ApplicationController

	def index
		authenticate_admin!
		@subscribers = Subscriber.search(params[:term], params[:page])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def create
		@subscriber = Subscriber.new(subscriber_params)
	  @subscriber.save
	  @categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	  redirect_to @subscriber
	end

	def show
		authenticate_admin!
		@subscriber = Subscriber.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def edit
		authenticate_admin!
		@subscriber = Subscriber.find(params[:id])
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		subscriber = Subscriber.find(params[:id])
    subscriber.update!(subscriber_params)
    redirect_to subscriber
	end

	def delete
	end

private
  def subscriber_params
    params.require(:subscriber).permit(:email, :active)
  end
	
end