package main

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
)

type article struct {
	ID string `json:"id"`
}
type fixture struct {
	SchemaVersion string    `json:"schema_version"`
	IsSynthetic   bool      `json:"is_synthetic"`
	SourceID      string    `json:"source_id"`
	Articles      []article `json:"articles"`
}

func parseFixture(r io.Reader) (fixture, error) {
	var f fixture
	dec := json.NewDecoder(io.LimitReader(r, 5<<20))
	if err := dec.Decode(&f); err != nil {
		return f, errors.New("invalid fixture JSON")
	}
	var extra any
	if err := dec.Decode(&extra); err != io.EOF {
		return f, errors.New("fixture must contain one JSON document")
	}
	if f.SchemaVersion != "1" || !f.IsSynthetic || f.SourceID != "fixture-only" || f.Articles == nil {
		return f, errors.New("only schema 1 synthetic fixture-only articles are accepted")
	}
	seen := map[string]bool{}
	for _, a := range f.Articles {
		if a.ID == "" || seen[a.ID] {
			return f, errors.New("article IDs must be present and unique")
		}
		seen[a.ID] = true
	}
	return f, nil
}

func run(args []string, w io.Writer) error {
	flags := flag.NewFlagSet("ingest", flag.ContinueOnError)
	flags.SetOutput(w)
	path := flags.String("fixture", "../../data/fixtures/news.json", "synthetic news fixture path")
	if err := flags.Parse(args); err != nil {
		return err
	}
	if flags.NArg() != 0 {
		return errors.New("unexpected positional arguments")
	}
	f, err := os.Open(*path)
	if err != nil {
		return errors.New("cannot open fixture file")
	}
	defer f.Close()
	data, err := parseFixture(f)
	if err != nil {
		return err
	}
	_, err = fmt.Fprintf(w, "mode=fixture-only source=fixture-only articles=%d synthetic=true\n", len(data.Articles))
	return err
}

func main() {
	if err := run(os.Args[1:], os.Stdout); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
