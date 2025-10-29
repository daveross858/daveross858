#!/usr/bin/env python3
"""
Remove unused CSS classes from style.css
Only removes classes that are confirmed to be unused and safe to remove.
"""

import re

def remove_unused_classes():
    # Read the safe-to-remove classes
    with open('safe_to_remove_classes.txt', 'r') as f:
        classes_to_remove = [line.strip() for line in f if line.strip()]
    
    # Read the CSS file
    with open('style.css', 'r') as f:
        css_content = f.read()
    
    original_length = len(css_content)
    removed_classes = []
    
    for class_name in classes_to_remove:
        # Pattern to match CSS class definitions
        # Matches: .classname { ... } including multi-line blocks
        pattern = rf'\.{re.escape(class_name)}\s*{{[^{{}}]*(?:{{[^{{}}]*}}[^{{}}]*)*}}'
        
        # Find matches to track what we're removing
        matches = re.findall(pattern, css_content, re.MULTILINE | re.DOTALL)
        if matches:
            removed_classes.append(class_name)
            print(f"Removing class: .{class_name}")
            
        # Remove the class definition
        css_content = re.sub(pattern, '', css_content, flags=re.MULTILINE | re.DOTALL)
    
    # Clean up multiple consecutive newlines
    css_content = re.sub(r'\n{3,}', '\n\n', css_content)
    
    # Write the cleaned CSS back
    with open('style.css', 'w') as f:
        f.write(css_content)
    
    # Report results
    final_length = len(css_content)
    lines_removed = original_length - final_length
    
    print(f"\n--- CSS Cleanup Results ---")
    print(f"Classes removed: {len(removed_classes)}")
    print(f"Characters removed: {lines_removed}")
    print(f"Original size: {original_length} characters")
    print(f"Final size: {final_length} characters")
    print(f"Size reduction: {(lines_removed/original_length)*100:.1f}%")
    
    if removed_classes:
        print(f"\nRemoved classes: {', '.join(removed_classes)}")

if __name__ == "__main__":
    remove_unused_classes()