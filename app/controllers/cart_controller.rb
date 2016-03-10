class CartController < ApplicationController
  def index
  	# If there is a session created, show that one, otherwise create a new hash
  	if session[:cart] then
  		@cart=session[:cart]
  	else
  		@cart={}
  	end

  end

  def add
  	# Getting product id
  	id=params[:id]

  	if session[:cart] then 
  		# Calls the existing cart
  		cart=session[:cart]
  	else
  		session[:cart]={}
  		cart=session[:cart]
  	end
	# If product was added already to the cart(if that id exists), add 1 to the cart, else, show only 1
  	if cart[id] then 
  		# If cart exist, add item to it
  		cart[id]+=1
  	else
  		cart[id]=1
    end
    	redirect_to cart_path
  end

  def create

  end 
  # Remove each item from the hash
  def remove_item
  	id=params[:id]
  	cart=session[:cart]
  	cart.delete(id)
  	redirect_to cart_path
  end

  def destroy
  	# Destroy existing session
  	if session[:cart]
  		session[:cart]=nil
  	end
  	redirect_to cart_path
  	
  end
end
