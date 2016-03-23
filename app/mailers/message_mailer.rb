class MessageMailer < ApplicationMailer

  default from: "karin@shoppingcart.com"
  default to: "karinfdez@yahoo.com"

  def new_message(message)
    @message = message
    
    mail subject: "Message from #{message.name}(Shopping Cart website)" 
  end
end
