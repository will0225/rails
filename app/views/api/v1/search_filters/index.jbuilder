json.genres do
  json.partial! "api/v1/search_filters/tags", tags: @genres
end

json.moods do
  json.partial! "api/v1/search_filters/tags", tags: @moods
end

json.instruments do
  json.partial! "api/v1/search_filters/tags", tags: @instruments
end
