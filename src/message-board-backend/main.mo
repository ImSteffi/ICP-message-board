type FormData = {
  title : Text;
  description : Text;
  content : Text;
  category : Text;
  image : Blob;
};

actor {
  stable var createdContentDataArray : [FormData] = [];

  // Update Content array with the data
  public func addFormData(newData : FormData) : async () {
    await createdContentDataArray := createdContentDataArray + [newData];
  };

  public query func getFormData() : async [FormData] {
    await return createdContentDataArray;
  };
};