#include <iostream>
#include <vector>
using namespace std;

struct Node
{
    int val;
    Node* left;
    Node* right;

    Node(int val) : val(val), left(nullptr), right(nullptr) {}
};

class BST
{
public:
    Node* root;
    vector<Node*> nodes;
    BST(int val) : root(new Node(val))
    {
        nodes.push_back(root);
    }

    Node* insertHelper(Node* current, int val)
    {
        if (!current)
        {
            Node* node = new Node(val);
            nodes.push_back(node);
            return node;
        }
        
        if (val < current->val)
            current->left = insertHelper(current->left, val);
    
        else if (val > current->val)
            current->right = insertHelper(current->right, val);
        
        return current;
    }

    void printHelper(Node* current)
    {
        if (current)
        {
            printHelper(current->left);
            cout << current->val << ' ';
            printHelper(current->right);
        }
    }

    void insert(int val)
    {
        root = insertHelper(root, val);
    }

    void print()
    {
        printHelper(root);
    }


    ~BST()
    {
        for (auto node : nodes)
            delete node;
    }
};

int main()
{
    BST tree(40);

    tree.insert(50);

    tree.insert(60);

    tree.print();

}












