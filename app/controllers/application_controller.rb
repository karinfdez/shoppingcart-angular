class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

 # protect_from_forgery with: :null_session

before_filter :add_allow_credentials_headers
protect_from_forgery with: :null_session


def add_allow_credentials_headers                                                                                                                                                                                                                                                        
  # https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#section_5                                                                                                                                                                                                      
  #                                                                                                                                                                                                                                                                                       
  # Because we want our front-end to send cookies to allow the API to be authenticated                                                                                                                                                                                                   
  # (using 'withCredentials' in the XMLHttpRequest), we need to add some headers so                                                                                                                                                                                                      
  # the browser will not reject the response                                                                                                                                                                                                                                             
  response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'                                                                                                                                                                                                     
  response.headers['Access-Control-Allow-Credentials'] = 'true'     
  # response.headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
  # response.headers['Access-Control-Request-Method'] = '*'
  # response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                                                                                                                                                                                                                     
end 

def options                                                                                                                                                                                                                                                                              
  head :status => 200, :'Access-Control-Allow-Headers' => 'accept, content-type'                                                                                                                                                                                                         
end

# rescue_from ActionController::InvalidAuthenticityToken do |exception|
#   cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
#   render text: 'Invalid authenticity token', status: :unprocessable_entity
# end

end


