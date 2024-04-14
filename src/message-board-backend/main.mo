import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";

actor {
  public type FormData = {
    title : Text;
    description : Text;
    content : Text;
    category : Text;
  };

  var createdContentDataBuffer : Buffer.Buffer<FormData> = Buffer.Buffer<FormData>(10);

  private func formDataToText(data : FormData) : Text {
    "\n" # "Title: " # data.title # ", Description: " # data.description # ", Content: " # data.content # ", Category: " # data.category;
  };

  public func addFormData(newData : FormData) : async (Text) {
    createdContentDataBuffer.add(newData);
    let bufferContents = Buffer.toArray(createdContentDataBuffer);
    let formsText = Array.map<FormData, Text>(bufferContents, formDataToText);
    let formsDisplay = Array.foldLeft<Text, Text>(formsText, "", func(acc, elem) { acc # elem # "\n" });
    return formsDisplay;
  };

  public query func getFormData() : async [FormData] {
    let bufferContents = Buffer.toArray(createdContentDataBuffer);
    return bufferContents;
  };
};
