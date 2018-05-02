# Snapshot Diff Serializer

This is a simple diffing utility for Jest that is inspired by [snapshot-diff](https://github.com/jest-community/snapshot-diff). The key difference here is that `snapshot-diff-serializer` only comes as a serializer and is agnostic of other serializers, meaning you get nice diffs with Enzyme, or other serializers applied (something that `snapshot-diff` doesn't do).

## Installation

```
# npm
npm install --dev snapshot-diff-serializer
# yarn
yarn add -D snapshot-diff-serializer
```

## Configuration

Add the serializer to your `snapshotSerializers` array in your Jest config (example using package.json)

```json
{
  "jest": {
    "snapshotSerializers": [
      "jest-glamor-react",
      "enzyme-to-json/serializer",
      "<rootDir>/snapshot-diff-serializer"
    ],
  },
}
```

## Usage

Here is an example of using this serializer:

```jsx
const Component = ({ foo, bar }) => (
  <div>
    {foo != null && foo}
    {bar != null && bar}
  </div>
)
```

```jsx
import { shallow } from 'enzyme'
// Test
describe('Component', () => {
  test('variants', () => {
    expect({
      diffA: shallow(<Component foo={3} />),
      diffB: shallow(<Component bar={5} />),
      }).toMatchSnapshot()
  })
})
```

The produced snapshot would look like this:

```
exports[`Component variants 1`] = `
- Diff A
+ Diff B

  <div>
-   3
+   5
  </div>
`;
```