import Text "mo:base/Text";
import Buffer "mo:base/Buffer";

actor {
  public type FormData = {
    title : Text;
    description : Text;
    content : Text;
    category : Text;
  };

  var createdContentDataBuffer : Buffer.Buffer<FormData> = Buffer.Buffer<FormData>(10);

  public query func getFormData() : async [FormData] {
    let bufferContents = Buffer.toArray(createdContentDataBuffer);
    return bufferContents;
  };

  public func addFormData(newData : FormData) : async () {
    createdContentDataBuffer.add(newData);
  };

  public func editPost(index : Nat, newData : FormData) : async Bool {
    createdContentDataBuffer.put(index, newData);
    return true
  };

  public func removePost(index : Nat) : async (FormData) {
    createdContentDataBuffer.remove(index);
  };

  public func removeAllPosts() : async () {
    createdContentDataBuffer.clear();
  };

};
