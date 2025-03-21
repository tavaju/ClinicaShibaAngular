/**
 * Converts String to Camel Case with specified separator.
 *
 * @param input string
 * @param separator separate symbol
 * @returns converted string
 */
export function toCamelCase(input, separator = '-') {
    if (!input)
        throw Error('missing argument');
    const val = input.trim();
    if (!val.includes(separator))
        return val;
    let res = '';
    let iterator = 0;
    for (iterator; iterator < input.length; iterator += 1) {
        const char = input.charAt(iterator).trim();
        if (iterator === 0) {
            res += char.toLowerCase();
            // eslint-disable-next-line no-continue
            continue;
        }
        if (char === separator) {
            res += input.charAt(iterator + 1).trim().toUpperCase();
            iterator += 1;
            // eslint-disable-next-line no-continue
            continue;
        }
        // eslint-disable-next-line no-restricted-globals
        if (iterator > 0 && !isNaN(Number(+input.charAt(iterator - 1)))) {
            res += char.toUpperCase();
            // eslint-disable-next-line no-continue
            continue;
        }
        if (iterator > 0)
            res += char;
    }
    return res.trim();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9DYW1lbENhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYm9vdHN0cmFwLWljb25zLWxpYi9zcmMvbGliL2ludGVybmFsL3V0aWxzL3RvQ2FtZWxDYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBYSxFQUFFLFNBQVMsR0FBRyxHQUFHO0lBQ3hELElBQUksQ0FBQyxLQUFLO1FBQUUsTUFBTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU1QyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUM7SUFFekMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLEtBQUssUUFBUSxFQUFFLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLEVBQUU7UUFDckQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQyxJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDbEIsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQix1Q0FBdUM7WUFDdkMsU0FBUztTQUNWO1FBRUQsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2RCxRQUFRLElBQUksQ0FBQyxDQUFDO1lBQ2QsdUNBQXVDO1lBQ3ZDLFNBQVM7U0FDVjtRQUVELGlEQUFpRDtRQUNqRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQy9ELEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUIsdUNBQXVDO1lBQ3ZDLFNBQVM7U0FDVjtRQUVELElBQUksUUFBUSxHQUFHLENBQUM7WUFBRSxHQUFHLElBQUksSUFBSSxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb252ZXJ0cyBTdHJpbmcgdG8gQ2FtZWwgQ2FzZSB3aXRoIHNwZWNpZmllZCBzZXBhcmF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dCBzdHJpbmdcclxuICogQHBhcmFtIHNlcGFyYXRvciBzZXBhcmF0ZSBzeW1ib2xcclxuICogQHJldHVybnMgY29udmVydGVkIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKGlucHV0OiBzdHJpbmcsIHNlcGFyYXRvciA9ICctJyk6IHN0cmluZyB7XHJcbiAgaWYgKCFpbnB1dCkgdGhyb3cgRXJyb3IoJ21pc3NpbmcgYXJndW1lbnQnKTtcclxuXHJcbiAgY29uc3QgdmFsID0gaW5wdXQudHJpbSgpO1xyXG4gIGlmICghdmFsLmluY2x1ZGVzKHNlcGFyYXRvcikpIHJldHVybiB2YWw7XHJcblxyXG4gIGxldCByZXMgPSAnJztcclxuICBsZXQgaXRlcmF0b3IgPSAwO1xyXG5cclxuICBmb3IgKGl0ZXJhdG9yOyBpdGVyYXRvciA8IGlucHV0Lmxlbmd0aDsgaXRlcmF0b3IgKz0gMSkge1xyXG4gICAgY29uc3QgY2hhciA9IGlucHV0LmNoYXJBdChpdGVyYXRvcikudHJpbSgpO1xyXG5cclxuICAgIGlmIChpdGVyYXRvciA9PT0gMCkge1xyXG4gICAgICByZXMgKz0gY2hhci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYXIgPT09IHNlcGFyYXRvcikge1xyXG4gICAgICByZXMgKz0gaW5wdXQuY2hhckF0KGl0ZXJhdG9yICsgMSkudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGl0ZXJhdG9yICs9IDE7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXHJcbiAgICBpZiAoaXRlcmF0b3IgPiAwICYmICFpc05hTihOdW1iZXIoK2lucHV0LmNoYXJBdChpdGVyYXRvciAtIDEpKSkpIHtcclxuICAgICAgcmVzICs9IGNoYXIudG9VcHBlckNhc2UoKTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpdGVyYXRvciA+IDApIHJlcyArPSBjaGFyO1xyXG4gIH1cclxuICByZXR1cm4gcmVzLnRyaW0oKTtcclxufVxyXG4iXX0=