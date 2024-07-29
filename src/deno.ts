import { parse } from "flags";
import { fetchEntry, fetchEntryItems } from './index.ts'

const {_: [command, arg1, arg2]} = parse(Deno.args, {
    string: [ "keyword"]
})

switch (command) {
    case 'keyword': {
        const result = await fetchEntryItems(arg1 as string)
        console.log(result)
        break
    }
    case 'entry': {
        const result = await fetchEntry(arg1 as string, arg2 as string)
        console.log(result)
        break
    }
}