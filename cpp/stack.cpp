#include <iostream>

class Node
{
public:
    int val;
    Node* next;
    Node(int val, Node* next) : val(val), next(next) {}
};

class Stack
{
public:
    Node* top;
    int count;
    Stack() : top(nullptr), count(0) {}
    Stack(int* init, int size) : top(nullptr), count(0)
    {
        for (int i = 0; i < size; i++)
        {
            Push(init[i]);
        }       
    }

    void Push(int val)
    {
        Node* node = new Node(val, this->top);
        this->top = node;
    }

    int Pop()
    {
        if (!this->top)
            return -1;

        Node* tmp = this->top;
        this->top = tmp->next;
        int out = tmp->val;
        delete tmp;
        return out;
    }

    void Print()
    {
        if (!this->top || !this->top->next)
            return;
        std::cout << this->top->val << " <- top\n";
        Node* tmp = this->top->next;
        while (tmp)
        {
            std::cout << tmp->val << '\n';
            tmp = tmp->next;
        }
        std::cout << std::endl;
    }

    void Sort()
    {
        if (!this->top || !this->top->next)
            return;
        
        for (Node* curr = this->top; curr; curr = curr->next)
        {
            for (Node* next = curr->next; next; next = next->next)
            {
                if (curr->val > next->val)
                {
                    int tmp = curr->val;
                    curr->val = next->val;
                    next->val = tmp;
                }
            }
        }
    }

    void Reverse()
    {
        if (!this->top || !this->top->next)
            return;
        Node* prev = nullptr;
        Node* curr = this->top;
        Node* next = nullptr;
        while (curr)
        {
            next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        this->top = prev;
    }
    
    ~Stack()
    {
        while (this->top)
        {
            Node* tmp = this->top;
            this->top = tmp->next;
            delete tmp;
        }
    }
};


int main()
{
    int init[] = { 50, 60, 80, 40 };
    Stack stack(init, 4);

    stack.Push(70);
    
    stack.Print();
    
    stack.Reverse();

    stack.Print();
}

