class ErrorsController < ApplicationController
  def not_found
    @subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		render(:status => 404)
  end

  def internal_server_error
    @subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		render(:status => 500)
  end
end
