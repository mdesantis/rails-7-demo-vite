class ApplicationController < ActionController::Base
  layout 'hello_react', only: %i[hello_react]

  def hello_react
  end
end
