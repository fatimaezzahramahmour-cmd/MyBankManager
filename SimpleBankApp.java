import java.io.*;
import java.net.*;
import java.util.*;
import java.nio.charset.StandardCharsets;

public class SimpleBankApp {
    private static final int PORT = 8081;
    private static final String CRLF = "\r\n";
    
    // Données de test
    private static final String USERS_JSON = "[{\"id\":1,\"fullName\":\"Admin MyBank\",\"email\":\"admin@mybank.com\",\"password\":\"admin123\",\"role\":\"ADMIN\"},{\"id\":2,\"fullName\":\"Ahmed Ben Ali\",\"email\":\"ahmed@email.com\",\"password\":\"password123\",\"role\":\"CLIENT\"}]";
    private static final String BANK_ACCOUNTS_JSON = "[{\"id\":1,\"accountNumber\":\"MA123456789012345678901234\",\"accountType\":\"COURANT\",\"balance\":15420.00,\"userId\":2,\"status\":\"ACTIVE\"}]";
    private static final String CREDIT_CARDS_JSON = "[{\"id\":1,\"cardNumber\":\"1234567890123456\",\"cardType\":\"VISA\",\"userId\":2,\"status\":\"ACTIVE\"}]";
    private static final String LOANS_JSON = "[{\"id\":1,\"loanType\":\"PERSONNEL\",\"amount\":50000.00,\"status\":\"APPROUVE\",\"userId\":2}]";
    private static final String TRANSACTIONS_JSON = "[{\"id\":1,\"transactionType\":\"DEPOT\",\"amount\":5000.00,\"status\":\"COMPLETE\",\"userId\":2}]";
    
    public static void main(String[] args) {
        System.out.println(">> Demarrage du serveur API MyBankManager...");
        System.out.println(">> URL: http://localhost:" + PORT);
        System.out.println(">> Endpoints disponibles:");
        System.out.println("   - GET  http://localhost:" + PORT + "/api/users");
        System.out.println("   - POST http://localhost:" + PORT + "/api/users/login");
        System.out.println("   - GET  http://localhost:" + PORT + "/bankaccounts");
        System.out.println("   - GET  http://localhost:" + PORT + "/api/creditcards");
        System.out.println("   - GET  http://localhost:" + PORT + "/api/loans");
        System.out.println("   - GET  http://localhost:" + PORT + "/api/transactions");
        System.out.println("");
        System.out.println(">> Pret pour les tests !");
        
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println(">> Serveur demarre sur le port " + PORT);
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                new Thread(() -> handleRequest(clientSocket)).start();
            }
        } catch (IOException e) {
            System.err.println(">> Erreur serveur: " + e.getMessage());
        }
    }
    
    private static void handleRequest(Socket clientSocket) {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
             PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {
            
            String requestLine = in.readLine();
            if (requestLine == null) return;
            
            String[] parts = requestLine.split(" ");
            String method = parts[0];
            String path = parts[1];
            
            // Headers
            String line;
            while ((line = in.readLine()) != null && !line.isEmpty()) {
                // Lire les headers
            }
            
            String response = createResponse(method, path);
            out.print(response);
            out.flush();
            
        } catch (IOException e) {
            System.err.println(">> Erreur client: " + e.getMessage());
        }
    }
    
    private static String createResponse(String method, String path) {
        String body = "";
        String contentType = "application/json";
        
        if (path.equals("/api/users") && method.equals("GET")) {
            body = USERS_JSON;
        } else if (path.equals("/api/users/login") && method.equals("POST")) {
            body = "{\"id\":1,\"fullName\":\"Admin MyBank\",\"email\":\"admin@mybank.com\",\"role\":\"ADMIN\"}";
        } else if (path.equals("/bankaccounts") && method.equals("GET")) {
            body = BANK_ACCOUNTS_JSON;
        } else if (path.equals("/api/creditcards") && method.equals("GET")) {
            body = CREDIT_CARDS_JSON;
        } else if (path.equals("/api/loans") && method.equals("GET")) {
            body = LOANS_JSON;
        } else if (path.equals("/api/transactions") && method.equals("GET")) {
            body = TRANSACTIONS_JSON;
        } else if (path.equals("/api/test") && method.equals("GET")) {
            body = "{\"message\":\"API MyBankManager fonctionne !\",\"timestamp\":\"" + new Date() + "\"}";
        } else if (path.equals("/") && method.equals("GET")) {
            body = "{\"message\":\"API MyBankManager fonctionne !\",\"status\":\"success\"}";
        } else {
            body = "{\"error\":\"Endpoint non trouvé\"}";
        }
        
        return "HTTP/1.1 200 OK" + CRLF +
               "Content-Type: " + contentType + CRLF +
               "Access-Control-Allow-Origin: *" + CRLF +
               "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS" + CRLF +
               "Access-Control-Allow-Headers: Content-Type" + CRLF +
               "Content-Length: " + body.getBytes(StandardCharsets.UTF_8).length + CRLF +
               CRLF +
               body;
    }
} 