import Int "mo:base/Int";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
    // URL entry type
    type UrlEntry = {
        url: Text;
        timestamp: Int;
    };

    // Stable storage for URLs
    stable var urlHistory: [UrlEntry] = [];
    
    // Add URL to history
    public func addUrl(url: Text) : async [UrlEntry] {
        let newEntry: UrlEntry = {
            url = url;
            timestamp = Time.now();
        };
        
        // Create buffer from stable array
        let buffer = Buffer.Buffer<UrlEntry>(urlHistory.size() + 1);
        for (entry in urlHistory.vals()) {
            buffer.add(entry);
        };
        buffer.add(newEntry);
        
        // Update stable storage
        urlHistory := Buffer.toArray(buffer);
        return urlHistory;
    };

    // Get URL history
    public query func getHistory() : async [UrlEntry] {
        return urlHistory;
    };
}
