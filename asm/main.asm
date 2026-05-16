default rel

extern CreateFileA
extern ReadFile
extern WriteFile
extern GetStdHandle
extern ExitProcess

%define STD_OUTPUT_HANDLE -11
%define GENERIC_READ      0x80000000
%define OPEN_EXISTING     3
%define FILE_ATTRIBUTE_NORMAL 0x80

section .data
filename db "code.bin", 0

section .bss
buffer resb 4096
bytes_read resd 1

section .text
global main
main:
    mov rcx, STD_OUTPUT_HANDLE
    call GetStdHandle
    mov r12, rax               
  
    sub rsp, 56                
    mov rcx, filename          
    mov rdx, GENERIC_READ       
    xor r8, r8                  
    xor r9, r9                

    mov qword [rsp+32], OPEN_EXISTING
    mov qword [rsp+40], FILE_ATTRIBUTE_NORMAL
    mov qword [rsp+48], 0

    call CreateFileA
    add rsp, 56

    mov r13, rax                ; save file handle

read_loop:
    sub rsp, 40

    mov rcx, r13                ; hFile
    mov rdx, buffer             ; lpBuffer
    mov r8, 4096                ; nNumberOfBytesToRead
    lea r9, [bytes_read]        ; lpNumberOfBytesRead
    mov qword [rsp+32], 0       ; lpOverlapped = NULL

    call ReadFile
    add rsp, 40

    cmp dword [bytes_read], 0
    je done                     ; EOF

    sub rsp, 40

    mov rcx, r12                ; stdout handle
    mov rdx, buffer             ; buffer
    mov r8, [bytes_read]        ; bytes to write
    lea r9, [bytes_read]        ; bytes written
    mov qword [rsp+32], 0

    call WriteFile
    add rsp, 40

    jmp read_loop

done:
    mov ecx, 0
    call ExitProcess

