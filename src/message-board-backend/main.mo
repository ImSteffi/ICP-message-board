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
    book.size();
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

  // put()
  public func putBookValue(index : Nat, x : Text) : async (Text) {
    book.put(index, x);
    return book.get(index);
  };

  // removeLast()
  public func removeLastBookValue() : async ?Text {
    book.removeLast();
  };

  // remove()
  public func removeBookValue(index: Nat) : async Text {
    book.remove(index);
  };

  // clear()
  public func clearBook() : async () {
    book.clear();
  };

  /* filterEntries() - Filtering method for REMOVING data collections. 
                       Scenarios where you need to conditionally REMOVE elements based on certain criteria */
  public func filterBookEntries() : async () {
    book.add("Entry 0");
    book.add("Entry 1");
    book.add("Entry 2");
    book.add("Entry 3");
    book.add("Entry 4");
    book.add("Entry 5");
    book.add("Entry 6");
    book.add("Entry 7");
    book.add("Entry 8");
    book.add("Entry 9");
    book.add("Entry 10");
    book.filterEntries(func (index, _) = index % 2 == 0);
  };

  // capacity() - Returns the capacity of the buffer (the length of the underlying array)
  public func getBookCapacity() : async Nat {
    book.capacity();
  };

  // reserve() - changes the capacity to X
  public func reserveBookCapacity(x : Nat) : async Nat {
    book.reserve(x);
    book.capacity();
  };

};
