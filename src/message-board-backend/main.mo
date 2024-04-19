import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";

actor {
  public type FormData = {
    title : Text;
    description : Text;
    content : Text;
    category : Text;
  };

  var createdContentDataBuffer : Buffer.Buffer<FormData> = Buffer.Buffer<FormData>(10);

  public query func getFormData() : async [FormData] {
    return Buffer.toArray(createdContentDataBuffer);
  };

  public func addFormData(newData : FormData) : async () {
    createdContentDataBuffer.add(newData);
  };

  public func editPost(index : Nat, newData : FormData) : async Bool {
    createdContentDataBuffer.put(index, newData);
    return true;
  };

  public func removePost(index : Nat) : async (FormData) {
    createdContentDataBuffer.remove(index);
  };

  public func removeAllPosts() : async () {
    createdContentDataBuffer.clear();
  };

  //

  // creates a new buffer
  let book = Buffer.Buffer<Text>(11);

  // size()
  public func getBookBufferSize() : async Nat {
    return book.size();
  };

  // add()
  public func addValueToBookBuffer(val : Text) : async () {
    book.add(val);
  };

  // get()
  public func getBookValues() : async [Text] {
    return Buffer.toArray(book);
  };

  //getOpt() - Safely access elements in data structure without receiving ERROR
  public func getOptValue(index : Nat) : async ?Text {
    if (index <= book.size()) {
      return ?("Book size: " # Nat.toText(book.size()));
    } else {
      return ?("Error hah: Index out of bounds");
    };
  };

  // put
  public func putBookValue(index : Nat, x : Text) : async (Text) {
    book.put(index, x);
    return book.get(index);
  };

};
