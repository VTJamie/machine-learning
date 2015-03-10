function [prediction] = nnPredict(nn_params, ...
                                   input_layer_size, ...
                                   num_labels, ...
                                   X)

% Reshape nn_params back into the parameters Theta1 and Theta2, the weight matrices
% for our 2 layer neural network
Theta1 = reshape(nn_params(1:num_labels * (input_layer_size + 1)), ...
                 num_labels, (input_layer_size + 1));

% Setup some useful variables
m = size(X, 1);
% You need to return the following variables correctly
J = 0;
X = [ones(m, 1) X];

prediction =  sigmoid(X*Theta1');

end
