#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>
#include <signal.h>

#define CYAN "\033[96m"
#define GREEN "\033[92m"
#define YELLOW "\033[93m"
#define RESET "\033[0m"
#define BOLD "\033[1m"

#define ORANGE "\033[38;5;214m"
#define BLUE "\033[38;5;33m"
#define BG_DARK_GRAY "\033[48;5;236m"
#define TEXT_WHITE "\033[97m"
#define TEXT_DIM "\033[38;5;244m"

#define UI_WIDTH 74

#define strcasecmp _stricmp 

void setup_windows_console() {
    SetConsoleOutputCP(CP_UTF8);
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    if (hOut == INVALID_HANDLE_VALUE) return;
    
    DWORD dwMode = 0;
    if (!GetConsoleMode(hOut, &dwMode)) return;
    
    dwMode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
    SetConsoleMode(hOut, dwMode);
}

int get_padding(int target_width) {
    CONSOLE_SCREEN_BUFFER_INFO csbi;
    int term_width = 80; 
    
    if (GetConsoleScreenBufferInfo(GetStdHandle(STD_OUTPUT_HANDLE), &csbi)) {
        term_width = csbi.srWindow.Right - csbi.srWindow.Left + 1;
    }
    
    int pad_size = (term_width - target_width) / 2;
    return (pad_size > 0) ? pad_size : 0;
}

void print_spaces(int count) {
    for (int i = 0; i < count; i++) {
        putchar(' ');
    }
}

void print_ascii_title() {
    const char *ascii_art[] = {
        " ██████  ██   ██  ██████  ███████  ██████  ███    ███     █████   ██",
        "██       ██   ██ ██          ██   ██    ██ ████  ████    ██   ██  ██",
        "██       ██   ██  ██████     ██   ██    ██ ██ ████ ██    ███████  ██",
        "██       ██   ██       ██    ██   ██    ██ ██  ██  ██    ██   ██  ██",
        " ██████   ██████  ██████     ██    ██████  ██      ██    ██   ██  ██"
    };
    
    int num_lines = sizeof(ascii_art) / sizeof(ascii_art[0]);
    
    printf("\n");
    for (int i = 0; i < num_lines; i++) {
        int pad = get_padding(74); 
        print_spaces(pad);
        printf("%s%s%s%s\n", CYAN, BOLD, ascii_art[i], RESET);
    }
    printf("\n");
}

void simulate_thinking(double duration_seconds) {
    int pad = get_padding(UI_WIDTH);
    const char *spinner[] = {"⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"};
    int spinner_frames = 10;
    int frame = 0;
    
    DWORD duration_ms = (DWORD)(duration_seconds * 1000);
    ULONGLONG end_time = GetTickCount64() + duration_ms;
    
    while (GetTickCount64() < end_time) {
        printf("\r");
        print_spaces(pad);
        printf("%s▌%s %s[%s] Model is computing...%s", ORANGE, RESET, YELLOW, spinner[frame % spinner_frames], RESET);
        fflush(stdout);
        Sleep(80); 
        frame++;
    }
    
    printf("\r");
    print_spaces(pad);
    print_spaces(UI_WIDTH);
    printf("\r");
    fflush(stdout);
}

void stream_response(const char *text) {
    int pad = get_padding(UI_WIDTH);
    
    print_spaces(pad);
    printf("%s▌%s %sAI · Big Pickle · Complete%s\n", BLUE, RESET, TEXT_DIM, RESET);
    
    print_spaces(pad);
    printf("%s▌%s %s", BLUE, RESET, BG_DARK_GRAY);
    print_spaces(UI_WIDTH - 2);
    printf("%s\r", RESET);
    
    print_spaces(pad);
    printf("%s▌%s %s ", BLUE, RESET, BG_DARK_GRAY);
    
    size_t len = strlen(text);
    for (size_t i = 0; i < len; i++) {
        printf("%s%c", TEXT_WHITE, text[i]);
        fflush(stdout);
        Sleep(20); 
    }
    
    printf("%s\n\n", RESET);
}

void handle_sigint(int sig) {
    int pad = get_padding(UI_WIDTH);
    printf("%s\033[J\n\n", RESET);
    print_spaces(pad);
    printf("%sSession aborted by user.%s\n", YELLOW, RESET);
    exit(0);
}

int main() {
    setup_windows_console();
    signal(SIGINT, handle_sigint);
    
    print_ascii_title();
    
    char user_input[256];
    
    while (1) {
        int pad = get_padding(UI_WIDTH);
        
        print_spaces(pad);
        printf("%s▌%s %s", ORANGE, RESET, BG_DARK_GRAY);
        print_spaces(UI_WIDTH - 2);
        printf("%s\r", RESET);
        fflush(stdout);
        
        print_spaces(pad);
        printf("%s▌%s %s You: %s", ORANGE, RESET, BG_DARK_GRAY, TEXT_WHITE);
        fflush(stdout);
        
        if (fgets(user_input, sizeof(user_input), stdin) == NULL) {
            break; 
        }
        
        printf("%s", RESET);
        
        user_input[strcspn(user_input, "\n")] = 0;
        
        if (strcasecmp(user_input, "exit") == 0 || strcasecmp(user_input, "quit") == 0) {
            printf("\n");
            print_spaces(pad);
            printf("%sTerminating session...%s\n\n", YELLOW, RESET);
            break;
        }
        
        simulate_thinking(1.5);
        
        const char *mock_response = "This is a mock response";
        stream_response(mock_response);
    }
    
    printf("%s\033[J", RESET);
    
    return 0;
}