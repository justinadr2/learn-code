import sys
import time
import itertools
import shutil

CYAN = '\033[96m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
RESET = '\033[0m'
BOLD = '\033[1m'

ORANGE = '\033[38;5;214m'      
BLUE = '\033[38;5;33m'         
BG_DARK_GRAY = '\033[48;5;236m' 
TEXT_WHITE = '\033[97m'
TEXT_DIM = '\033[38;5;244m'     

UI_WIDTH = 70 

def get_padding(target_width=UI_WIDTH):
    term_width = shutil.get_terminal_size().columns
    pad_size = max(0, (term_width - target_width) // 2)
    return " " * pad_size

def print_ascii_title():
    ascii_art = [
        "██████  ██   ██ ███████ ██   ██  █████  ██   ██    █████  ██",
        "██   ██  ██ ██    ██    ██   ██ ██   ██ ███  ██   ██   ██ ██",
        "██████    ██      ██    ███████ ██   ██ ██ ████   ███████ ██",
        "██        ██      ██    ██   ██ ██   ██ ██  ███   ██   ██ ██",
        "██        ██      ██    ██   ██  █████  ██   ██   ██   ██ ██"
    ]
    
    print("\n")
    for line in ascii_art:
        pad = get_padding(target_width=len(line))
        print(f"{pad}{CYAN}{BOLD}{line}{RESET}")
    print("\n")

def simulate_thinking(duration):
    pad = get_padding()
    spinner = itertools.cycle(['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'])
    end_time = time.time() + duration
    
    border = f"{ORANGE}▌{RESET} "
    
    while time.time() < end_time:
        sys.stdout.write(f"\r{pad}{border}{YELLOW}[{next(spinner)}] Model is computing...{RESET}")
        sys.stdout.flush()
        time.sleep(0.08)
        
    sys.stdout.write("\r" + pad + " " * UI_WIDTH + "\r")
    sys.stdout.flush()

def stream_response(text):
    pad = get_padding()
    border = f"{BLUE}▌{RESET} "
    
    sys.stdout.write(f"{pad}{border}{TEXT_DIM}AI · Big Pickle · Complete{RESET}\n")
    
    empty_box = f"{BG_DARK_GRAY}" + (" " * (UI_WIDTH - 2)) + f"{RESET}"
    sys.stdout.write(f"{pad}{border}{empty_box}\r")
    
    sys.stdout.write(f"{pad}{border}{BG_DARK_GRAY} ")
    for char in text:
        sys.stdout.write(f"{TEXT_WHITE}{char}")
        sys.stdout.flush()
        time.sleep(0.02)
    
    print(f"{RESET}\n")

def main():
    print_ascii_title()
    
    while True:
        try:
            pad = get_padding()
            
            border = f"{ORANGE}▌{RESET} "
            
            empty_box = f"{BG_DARK_GRAY}" + (" " * (UI_WIDTH - 2)) + f"{RESET}"
            sys.stdout.write(f"{pad}{border}{empty_box}\r")
            sys.stdout.flush()
            
            prompt_ui = f"{pad}{border}{BG_DARK_GRAY} You: {TEXT_WHITE}"
            user_input = input(prompt_ui)
            
            print(f"{RESET}", end="")
            
            if user_input.lower() in ['exit', 'quit']:
                print(f"\n{pad}{YELLOW}Terminating session...{RESET}\n")
                break
                
            simulate_thinking(1.5)
            
            mock_response = "This is a mock response"
            stream_response(mock_response)
            
        except KeyboardInterrupt:
            pad = get_padding()
            print(f"{RESET}\n\n{pad}{YELLOW}Session aborted by user.{RESET}\n")
            break

if __name__ == "__main__":
    main()