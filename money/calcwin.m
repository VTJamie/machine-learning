function [number, megaball] = calcwin()


   Xnum = csvread('../data/xnum.csv');
   Xmega = csvread('../data/xmega.csv');
   ynum = csvread('../data/ynum.csv');
   ymega = csvread('../data/ymega.csv');

    its = 2;

    Xtestnum = Xnum(end-its, :);
      Xtestmega = Xmega(end-its, :);
      ytestnum = ynum(end-its, :);
      ytestmega = ymega(end-its, :);

      Xnum = Xnum(1:end-5, :);
      Xmega = Xmega(1:end-5, :);
      ynum = ynum(1:end-5, :);
      ymega = ymega(1:end-5, :);

%NUMBER PREDICTIONS START
   Theta1 = rand(size(ynum)(2), size(Xnum)(2)+1);


%   nn_params = [Theta1(:)];
  theta = nn_params = csvread('../data/numtheta.csv');




   input_layer_size = size(Xnum)(2);
  num_labels = size(ynum)(2);


      options = optimset('GradObj', 'on', 'MaxIter', 2);
      [theta, cost] = ...
      	fminunc(@(t)(nnCostFunction(t, input_layer_size, num_labels, Xnum, ynum, 1)), nn_params, options);




     prediction = nnPredict(theta, input_layer_size, num_labels, Xtestnum);
    [sortedValues,sortIndex] = sort(prediction(:),'descend');  %# Sort the values in
                                                      %#   descending order
    number = sort(sortIndex(1:5), 'ascend')  %# Get a linear index into A of the 5 largest values
    [sortedValues,sortIndex] = sort(ytestnum(:),'descend');  %# Sort the values in
     numbertest = sort(sortIndex(1:5), 'ascend')  %# Get a linear index into A of the 5 largest values
      cost = cost
  csvwrite("../data/numtheta.csv", theta);

    
   %NUMBER PREDICTIONS END

    %MEGABALL PREDICTIONS    START
     Theta1 = rand(size(ymega)(2), size(Xmega)(2)+1);


 %      nn_params = [Theta1(:)];
 theta =  nn_params = csvread('../data/megatheta.csv');


        input_layer_size = size(Xmega)(2);
       num_labels = size(ymega)(2);

           options = optimset('GradObj', 'on', 'MaxIter', 2);
           [theta, cost] = ...
           	fminunc(@(t)(nnCostFunction(t, input_layer_size, num_labels, Xmega, ymega, 1)), nn_params, options);

          prediction = nnPredict(theta, input_layer_size, num_labels, Xtestmega);
         [sortedValues,sortIndex] = sort(prediction(:),'descend');  %# Sort the values in
                                                           %#   descending order
         megaball = sortIndex(1)  %# Get a linear index into A of the 5 largest values
         [sortedValues,sortIndex] = sort(ytestmega(:),'descend');  %# Sort the values in
         megaballtest = sortIndex(1)  %# Get a linear index into A of the 5 largest values


         cost = cost
             csvwrite("../data/megatheta.csv", theta);

    %MEGABALL PREDICTIONS END
    
    
    
    
end