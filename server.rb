require 'goliath'

class Server < Goliath::API
	@@a = 1

	def response(env)
		@@a += 1
		[200, {}, @@a]
	end
end
