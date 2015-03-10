function [number, megaball] = calcwin()


   Xnum = csvread('../data/xnum.csv');
   Xmega = csvread('../data/xmega.csv');
   ynum = csvread('../data/ynum.csv');
   ymega = csvread('../data/ymega.csv');


    Xtestnum = Xnum(end-1, :);
      Xtestmega = Xmega(end-1, :);
      ytestnum = ynum(end-1, :);
      ytestmega = ymega(end-1, :);

      Xnum = Xnum(1:end-1, :);
      Xmega = Xmega(1:end-1, :);
      ynum = ynum(1:end-1, :);
      ymega = ymega(1:end-1, :);

%NUMBER PREDICTIONS START
   Theta1 = rand(size(ynum)(2), size(Xnum)(2)+1);

   nn_params = [Theta1(:)];
   input_layer_size = size(Xnum)(2);
  num_labels = size(ynum)(2);
      options = optimset('GradObj', 'on', 'MaxIter', 10);
      [theta, cost] = ...
      	fminunc(@(t)(nnCostFunction(t, input_layer_size, num_labels, Xnum, ynum, 0.001)), nn_params, options);

     prediction = nnPredict(theta, input_layer_size, num_labels, Xtestnum);
    [sortedValues,sortIndex] = sort(prediction(:),'descend');  %# Sort the values in
                                                      %#   descending order
    number = sortIndex(1:5)  %# Get a linear index into A of the 5 largest values
    [sortedValues,sortIndex] = sort(ytestnum(:),'descend');  %# Sort the values in
     numbertest = sortIndex(1:5)  %# Get a linear index into A of the 5 largest values
      cost = cost
  csvwrite("numtheta.csv", theta);

    
   %NUMBER PREDICTIONS END

    %MEGABALL PREDICTIONS    START
     Theta1 = rand(size(ymega)(2), size(Xmega)(2)+1);
        nn_params = [Theta1(:)];
        input_layer_size = size(Xmega)(2);
       num_labels = size(ymega)(2);
           options = optimset('GradObj', 'on', 'MaxIter', 10);
           [theta, cost] = ...
           	fminunc(@(t)(nnCostFunction(t, input_layer_size, num_labels, Xmega, ymega, 0.001)), nn_params, options);


          prediction = nnPredict(theta, input_layer_size, num_labels, Xtestmega);
         [sortedValues,sortIndex] = sort(prediction(:),'descend');  %# Sort the values in
                                                           %#   descending order
         megaball = sortIndex(1)  %# Get a linear index into A of the 5 largest values
         [sortedValues,sortIndex] = sort(ytestmega(:),'descend');  %# Sort the values in
         megaballtest = sortIndex(1)  %# Get a linear index into A of the 5 largest values



         cost = cost
             csvwrite("megatheta.csv", theta);

    %MEGABALL PREDICTIONS END
    
    
    
    
end