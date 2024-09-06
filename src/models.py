import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd

# Define a simple neural network model
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.hidden = nn.Linear(1, 10)  # Input layer to hidden layer
        self.output = nn.Linear(10, 1)  # Hidden layer to output layer

    def forward(self, x):
        x = torch.relu(self.hidden(x))
        x = self.output(x)
        return x

# Function to load data from file
def load_data(filepath):
    df = pd.read_csv(filepath)
    df = df[['Date', 'Open', 'Close']]  # Select relevant columns
    df['Date'] = pd.to_datetime(df['Date'])  # Convert date to datetime
    df['Days'] = (df['Date'] - df['Date'].min()).dt.days  # Convert date to days since the start
    x_data = torch.tensor(df['Days'].values, dtype=torch.float32).unsqueeze(1)  # Days as input
    y_data = torch.tensor(df['Close'].values, dtype=torch.float32).unsqueeze(1)  # Closing price as output
    return x_data, y_data

# Example function to train the model
def train_model(x_train, y_train, model):
    criterion = nn.MSELoss()  # Mean Squared Error for regression
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Training loop (simple and quick for demonstration)
    for epoch in range(50000):  # Simple loop for 100 epochs
        model.train()
        optimizer.zero_grad()
        output = model(x_train)
        loss = criterion(output, y_train)
        loss.backward()
        optimizer.step()

        if (epoch + 1) % 10 == 0:
            print(f'Epoch {epoch+1}, Loss: {loss.item()}')

    # Save the trained model
    torch.save(model.state_dict(), 'models/model.pth')

def load_model(model_path='models/model.pth'):
    # Initialize the model
    model = SimpleNN()
    
    # Load the model weights (assuming the model was saved using torch.save())
    model.load_state_dict(torch.load(model_path))
    
    # Set the model to evaluation mode
    model.eval()
    
    return model

def main():
    # Load the data
    x_train, y_train = load_data('data/sfst.us.txt')
    
    # Initialize the model
    model = SimpleNN()

    # Train the model
    train_model(x_train, y_train, model)

if __name__ == '__main__':
    main()
