class ErrorsController < ApplicationController
  def not_found
    render(:status => 404)
    @subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
  end

  def internal_server_error
    render(:status => 500)
    @subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
  end
end
